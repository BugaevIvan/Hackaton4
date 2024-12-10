using System.ComponentModel.DataAnnotations;

namespace Hackaton4.Server.DAL.Entities
{
    public class Menu
    {
        [Key]
        public int Id { get; set; }

        public string Dish { get; set; } = null!;
        public string Structure { get; set; } = null!;
    }
}
