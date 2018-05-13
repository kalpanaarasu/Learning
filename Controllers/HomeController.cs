using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Data.SqlClient;
using Learning.Models;
using Learning.ViewModels;

namespace Learning.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ShowTrainerDetails(string keyword)
        {
            List<TrainerSkills> list = new List<TrainerSkills>();
            using (TrainerDemoEntities db = new TrainerDemoEntities())
            {
                list = db.Database.SqlQuery<TrainerSkills>("select trainerpersonaldetails.firstname,trainerpersonaldetails.lastname,trainerworkdetails.designation from trainermaster,trainerpersonaldetails,trainerworkdetails where trainermaster.trainerid=trainerpersonaldetails.trainerid and trainermaster.trainerid=trainerworkdetails.trainerid ").ToList();
            }
            return Json(list, JsonRequestBehavior.AllowGet);
            
         
        }
     

        public ActionResult Training()
        {
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}