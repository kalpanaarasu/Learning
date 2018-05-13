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
    public class TrainerWorkController : ApiController
    {
        private TrainerDemoEntities db = new TrainerDemoEntities();

        // GET api/TrainerWork
        public IQueryable<TrainerWorkDetail> GetTrainerWorkDetails()
        {
            return db.TrainerWorkDetails;
        }

        // GET api/TrainerWork/5
        [ResponseType(typeof(TrainerWorkDetail))]
        public IHttpActionResult GetTrainerWorkDetail(int id)
        {
            TrainerWorkDetail trainerworkdetail = db.TrainerWorkDetails.Find(id);
            if (trainerworkdetail == null)
            {
                return NotFound();
            }

            return Ok(trainerworkdetail);
        }

        // PUT api/TrainerWork/5
        public IHttpActionResult PutTrainerWorkDetail(int id, TrainerWorkDetail trainerworkdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trainerworkdetail.TrainerWorkId)
            {
                return BadRequest();
            }

            db.Entry(trainerworkdetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainerWorkDetailExists(id))
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

        // POST api/TrainerWork
        [ResponseType(typeof(TrainerWorkDetail))]
        public IHttpActionResult PostTrainerWorkDetail(TrainerWorkDetail trainerworkdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TrainerWorkDetails.Add(trainerworkdetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = trainerworkdetail.TrainerWorkId }, trainerworkdetail);
        }

        // DELETE api/TrainerWork/5
        [ResponseType(typeof(TrainerWorkDetail))]
        public IHttpActionResult DeleteTrainerWorkDetail(int id)
        {
            TrainerWorkDetail trainerworkdetail = db.TrainerWorkDetails.Find(id);
            if (trainerworkdetail == null)
            {
                return NotFound();
            }

            db.TrainerWorkDetails.Remove(trainerworkdetail);
            db.SaveChanges();

            return Ok(trainerworkdetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrainerWorkDetailExists(int id)
        {
            return db.TrainerWorkDetails.Count(e => e.TrainerWorkId == id) > 0;
        }
    }
}