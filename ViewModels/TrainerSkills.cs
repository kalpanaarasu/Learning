using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Learning.Models;

namespace Learning.ViewModels
{
    public class TrainerSkills
    {
        public int TrainerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Designation { get; set; }
        public string Course { get; set; }
        
    }
}