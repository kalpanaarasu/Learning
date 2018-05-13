using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Learning.Models;

namespace Learning.Controllers
{
    public class TrainerSkillsController : ApiController
    {
        private TrainerDemoEntities db = new TrainerDemoEntities();

        // GET api/TrainerSkills
        public IQueryable<TrainerSkillsDetail> GetTrainerSkillsDetails()
        {
            return db.TrainerSkillsDetails;
        }

        // GET api/TrainerSkills/5
        [ResponseType(typeof(TrainerSkillsDetail))]
        public IHttpActionResult GetTrainerSkillsDetail(int id)
        {
            TrainerSkillsDetail trainerskillsdetail = db.TrainerSkillsDetails.Find(id);
            if (trainerskillsdetail == null)
            {
                return NotFound();
            }

            return Ok(trainerskillsdetail);
        }

        // PUT api/TrainerSkills/5
        public IHttpActionResult PutTrainerSkillsDetail(int id, TrainerSkillsDetail trainerskillsdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trainerskillsdetail.TrainerSkillsId)
            {
                return BadRequest();
            }

            db.Entry(trainerskillsdetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainerSkillsDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/TrainerSkills
        [ResponseType(typeof(TrainerSkillsDetail))]
        public IHttpActionResult PostTrainerSkillsDetail(TrainerSkillsDetail trainerskillsdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TrainerSkillsDetails.Add(trainerskillsdetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = trainerskillsdetail.TrainerSkillsId }, trainerskillsdetail);
        }

        // DELETE api/TrainerSkills/5
        [ResponseType(typeof(TrainerSkillsDetail))]
        public IHttpActionResult DeleteTrainerSkillsDetail(int id)
        {
            TrainerSkillsDetail trainerskillsdetail = db.TrainerSkillsDetails.Find(id);
            if (trainerskillsdetail == null)
            {
                return NotFound();
            }

            db.TrainerSkillsDetails.Remove(trainerskillsdetail);
            db.SaveChanges();

            return Ok(trainerskillsdetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrainerSkillsDetailExists(int id)
        {
            return db.TrainerSkillsDetails.Count(e => e.TrainerSkillsId == id) > 0;
        }
    }
}