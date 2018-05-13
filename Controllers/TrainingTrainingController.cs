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
    public class TrainingTrainingController : ApiController
    {
        private TrainerDemoEntities db = new TrainerDemoEntities();

        // GET api/TrainingTraining
        public IQueryable<TrainerTrainingDetail> GetTrainerTrainingDetails()
        {
            return db.TrainerTrainingDetails;
        }

        // GET api/TrainingTraining/5
        [ResponseType(typeof(TrainerTrainingDetail))]
        public IHttpActionResult GetTrainerTrainingDetail(int id)
        {
            TrainerTrainingDetail trainertrainingdetail = db.TrainerTrainingDetails.Find(id);
            if (trainertrainingdetail == null)
            {
                return NotFound();
            }

            return Ok(trainertrainingdetail);
        }

        // PUT api/TrainingTraining/5
        public IHttpActionResult PutTrainerTrainingDetail(int id, TrainerTrainingDetail trainertrainingdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trainertrainingdetail.TrainerTrainID)
            {
                return BadRequest();
            }

            db.Entry(trainertrainingdetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainerTrainingDetailExists(id))
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

        // POST api/TrainingTraining
        [ResponseType(typeof(TrainerTrainingDetail))]
        public IHttpActionResult PostTrainerTrainingDetail(TrainerTrainingDetail trainertrainingdetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TrainerTrainingDetails.Add(trainertrainingdetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = trainertrainingdetail.TrainerTrainID }, trainertrainingdetail);
        }

        // DELETE api/TrainingTraining/5
        [ResponseType(typeof(TrainerTrainingDetail))]
        public IHttpActionResult DeleteTrainerTrainingDetail(int id)
        {
            TrainerTrainingDetail trainertrainingdetail = db.TrainerTrainingDetails.Find(id);
            if (trainertrainingdetail == null)
            {
                return NotFound();
            }

            db.TrainerTrainingDetails.Remove(trainertrainingdetail);
            db.SaveChanges();

            return Ok(trainertrainingdetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrainerTrainingDetailExists(int id)
        {
            return db.TrainerTrainingDetails.Count(e => e.TrainerTrainID == id) > 0;
        }
    }
}