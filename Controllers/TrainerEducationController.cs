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
    public class TrainerEducationController : ApiController
    {
        private TrainerDemoEntities db = new TrainerDemoEntities();

        // GET api/TrainerEducation
        public IQueryable<TrainerEdnDetail> GetTrainerEdnDetails()
        {
            return db.TrainerEdnDetails;
        }

        // GET api/TrainerEducation/5
        [ResponseType(typeof(TrainerEdnDetail))]
        public IHttpActionResult GetTrainerEdnDetail(int id)
        {
            TrainerEdnDetail traineredndetail = db.TrainerEdnDetails.Find(id);
            if (traineredndetail == null)
            {
                return NotFound();
            }

            return Ok(traineredndetail);
        }

        // PUT api/TrainerEducation/5
        public IHttpActionResult PutTrainerEdnDetail(int id, TrainerEdnDetail traineredndetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != traineredndetail.TrainerEdnId)
            {
                return BadRequest();
            }

            db.Entry(traineredndetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainerEdnDetailExists(id))
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

        // POST api/TrainerEducation
        [ResponseType(typeof(TrainerEdnDetail))]
        public IHttpActionResult PostTrainerEdnDetail(TrainerEdnDetail traineredndetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TrainerEdnDetails.Add(traineredndetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = traineredndetail.TrainerEdnId }, traineredndetail);
        }

        // DELETE api/TrainerEducation/5
        [ResponseType(typeof(TrainerEdnDetail))]
        public IHttpActionResult DeleteTrainerEdnDetail(int id)
        {
            TrainerEdnDetail traineredndetail = db.TrainerEdnDetails.Find(id);
            if (traineredndetail == null)
            {
                return NotFound();
            }

            db.TrainerEdnDetails.Remove(traineredndetail);
            db.SaveChanges();

            return Ok(traineredndetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrainerEdnDetailExists(int id)
        {
            return db.TrainerEdnDetails.Count(e => e.TrainerEdnId == id) > 0;
        }
    }
}