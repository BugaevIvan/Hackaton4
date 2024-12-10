using System.ComponentModel.DataAnnotations;

namespace Hackaton4.Server.DAL.Entities
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }

        public string Transport { get; set; } = null!;
        public string Route { get; set; } = null!;
        public DateTime DepartureDate{ get; set; }
        public DateTime ArrivalDate{ get; set; } 
    }
}
