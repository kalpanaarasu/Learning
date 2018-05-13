using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Learning.Models;

namespace Learning.Controllers
{
    public class trainingskillsController : Controller
    {
        private TrainerDemoEntities db = new TrainerDemoEntities();

        // GET: /trainingskills/
        public ActionResult Index()
        {
            return View(db.TrainerSkillsDetails.ToList());
        }

        // GET: /trainingskills/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TrainerSkillsDetail trainerskillsdetail = db.TrainerSkillsDetails.Find(id);
            if (trainerskillsdetail == null)
            {
                return HttpNotFound();
            }
            return View(trainerskillsdetail);
        }

        // GET: /trainingskills/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /trainingskills/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="TrainerSkillsId,SkillOne,SkillTwo,SkillThree,DomainOne,DomainTwo,DomainThree,LanguagesOne,LanguagesTwo,LanguagesThree,Description,ProjectOne,ProjectTwo,ProjectThree,TrainerPhotoUrl,TrainerProfileUrl,TrainerId")] TrainerSkillsDetail trainerskillsdetail)
        {
            if (ModelState.IsValid)
            {
                db.TrainerSkillsDetails.Add(trainerskillsdetail);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(trainerskillsdetail);
        }

        // GET: /trainingskills/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TrainerSkillsDetail trainerskillsdetail = db.TrainerSkillsDetails.Find(id);
            if (trainerskillsdetail == null)
            {
                return HttpNotFound();
            }
            return View(trainerskillsdetail);
        }

        // POST: /trainingskills/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="TrainerSkillsId,SkillOne,SkillTwo,SkillThree,DomainOne,DomainTwo,DomainThree,LanguagesOne,LanguagesTwo,LanguagesThree,Description,ProjectOne,ProjectTwo,ProjectThree,TrainerPhotoUrl,TrainerProfileUrl,TrainerId")] TrainerSkillsDetail trainerskillsdetail)
        {
            if (ModelState.IsValid)
            {
                db.Entry(trainerskillsdetail).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(trainerskillsdetail);
        }

        // GET: /trainingskills/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TrainerSkillsDetail trainerskillsdetail = db.TrainerSkillsDetails.Find(id);
            if (trainerskillsdetail == null)
            {
                return HttpNotFound();
            }
            return View(trainerskillsdetail);
        }

        // POST: /trainingskills/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TrainerSkillsDetail trainerskillsdetail = db.TrainerSkillsDetails.Find(id);
            db.TrainerSkillsDetails.Remove(trainerskillsdetail);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
