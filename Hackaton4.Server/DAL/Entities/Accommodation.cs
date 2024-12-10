﻿using System.ComponentModel.DataAnnotations;

namespace rusal.Server.DAL.Entities
{
    public class Accommodation
    {
        [Key]
        public int Id { get; set; }

        public string TypeHousing { get; set; } = null!;
        public int Capacity { get; set; }
        public string Location { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
