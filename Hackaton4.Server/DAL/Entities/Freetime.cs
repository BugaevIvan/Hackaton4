using System.ComponentModel.DataAnnotations;

namespace Hackaton4.Server.DAL.Entities
{
    public class Freetime
    {
        [Key]
        public int Id { get; set; }

        public DateTime StartDate { get; set; }
        public string Contacts { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
