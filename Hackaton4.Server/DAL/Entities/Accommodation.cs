using System.ComponentModel.DataAnnotations;

namespace rusal.Server.DAL.Entities
{
    public class Accommodation
    {
        [Key]
        public int AccommodationId { get; set; }

        public string TypeAcc { get; set; } = null!;
        public int Capacity { get; set; }
        public string Location { get; set; } = null!;
        public string Description { get; set; } = null!;
        public bool AvailabilityStatus { get; set; } = true;
    }
}
