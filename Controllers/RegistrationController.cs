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
    public class RegistrationController : ApiController
    {
        private TrainerDemoEntities db = new TrainerDemoEntities();

        // GET api/Registration
        public IQueryable<TrainerMaster> GetTrainerMasters()
        {
            return db.TrainerMasters;
        }

        // GET api/Registration/5
        [ResponseType(typeof(TrainerMaster))]
        public IHttpActionResult GetTrainerMaster(int id)
        {
            TrainerMaster trainermaster = db.TrainerMasters.Find(id);
            if (trainermaster == null)
            {
                return NotFound();
            }

            return Ok(trainermaster);
        }

        // PUT api/Registration/5
        public IHttpActionResult PutTrainerMaster(int id, TrainerMaster trainermaster)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trainermaster.TrainerId)
            {
                return BadRequest();
            }

            db.Entry(trainermaster).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainerMasterExists(id))
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

        // POST api/Registration
        [ResponseType(typeof(TrainerMaster))]
        
        public IHttpActionResult PostTrainerMaster(TrainerMaster trainermaster)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TrainerMasters.Add(trainermaster);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = trainermaster.TrainerId }, trainermaster);
        }

        // DELETE api/Registration/5
        [ResponseType(typeof(TrainerMaster))]
        public IHttpActionResult DeleteTrainerMaster(int id)
        {
            TrainerMaster trainermaster = db.TrainerMasters.Find(id);
            if (trainermaster == null)
            {
                return NotFound();
            }

            db.TrainerMasters.Remove(trainermaster);
            db.SaveChanges();

            return Ok(trainermaster);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrainerMasterExists(int id)
        {
            return db.TrainerMasters.Count(e => e.TrainerId == id) > 0;
        }
    }
}