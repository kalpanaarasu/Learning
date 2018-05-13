using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Entity;

using System.Web.Mvc;
using Learning.Models;

namespace Learning.Controllers
{
    public class TrainerController : Controller
    {
        //
        // GET: /Trainer/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetUser(string keyword)
        {
            TrainerMaster tm = new TrainerMaster();
            using (TrainerDemoEntities db = new TrainerDemoEntities())
            {
             
                if (string.IsNullOrEmpty(keyword))
                {
                    //list = db.TrainerMasters.ToList();
                }
                else
                {
                    tm = db.TrainerMasters.Where(p => p.TrainerEmail.StartsWith(keyword)).FirstOrDefault();
                }
            }
            return Json(tm, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetTrainer(string keyword)
        {
            List<TrainerMaster> list = new List<TrainerMaster>();
            using (TrainerDemoEntities db = new TrainerDemoEntities())
            {
                if (string.IsNullOrEmpty(keyword))
                {
                    list = db.TrainerMasters.ToList();
                }
                else
                {
                    //list = db.TrainerMasters.Where(p => p.TrainerEmail.StartsWith(keyword)).ToList();
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);

        }


	}
}