using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class BasketController : BaseApiController
  {
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
      _context = context;
    }

    private Basket? CreateBasket()
    {
      var buyerId = Guid.NewGuid().ToString();
      var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
      Response.Cookies.Append("buyerId", buyerId, cookieOptions);
      var basket = new Basket { BuyerId = buyerId };
      _context.Baskets!.Add(basket);
      return basket;
    }

    private async Task<Basket?> RetrieveBasket()
    {
      return await _context.Baskets!
            .Include(basket => basket.Items)
            .ThenInclude(basketItem => basketItem.Product)
            .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);
    }

    [HttpGet]
    public async Task<ActionResult<Basket>> GetBasket()
    {
      var basket = await RetrieveBasket();

      if (basket == null) return NotFound();

      return basket;
    }
  }
}