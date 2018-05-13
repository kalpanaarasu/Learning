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
    public class TrainerPersonalController : ApiController
    {
        private TrainerDemoEntities db = new TrainerDemoEntities();

        // GET api/TrainerPersonal
        public IQueryable<TrainerPersonalDetail> GetTrainerPersonalDetails()
        {
            return db.TrainerPersonalDetails;
        }

        // GET api/TrainerPersonal/5
        [ResponseType(typeof(TrainerPersonalDetail))]
        public IHttpActionResult GetTrainerPersonalDetail(int id)
        {
            TrainerPersonalDetail trainerpersonaldetail = db.TrainerPersonalDetails.Find(id);
            if (trainerpersonaldetail == null)
            {
                return NotFound();
            }

            return Ok(trainerpersonaldetail);
        }

        // PUT api/TrainerPersonal/5
        public IHttpActionResult PutTrainerPersonalDetail(int id, TrainerPersonalDetail trainerpersonaldetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != trainerpersonaldetail.TrainerPersonalId)
            {
                return BadRequest();
            }

            db.Entry(trainerpersonaldetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainerPersonalDetailExists(id))
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

        // POST api/TrainerPersonal
        [ResponseType(typeof(TrainerPersonalDetail))]
        public IHttpActionResult PostTrainerPersonalDetail(TrainerPersonalDetail trainerpersonaldetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TrainerPersonalDetails.Add(trainerpersonaldetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TrainerPersonalDetailExists(trainerpersonaldetail.TrainerPersonalId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = trainerpersonaldetail.TrainerPersonalId }, trainerpersonaldetail);
        }

        // DELETE api/TrainerPersonal/5
        [ResponseType(typeof(TrainerPersonalDetail))]
        public IHttpActionResult DeleteTrainerPersonalDetail(int id)
        {
            TrainerPersonalDetail trainerpersonaldetail = db.TrainerPersonalDetails.Find(id);
            if (trainerpersonaldetail == null)
            {
                return NotFound();
            }

            db.TrainerPersonalDetails.Remove(trainerpersonaldetail);
            db.SaveChanges();

            return Ok(trainerpersonaldetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrainerPersonalDetailExists(int id)
        {
            return db.TrainerPersonalDetails.Count(e => e.TrainerPersonalId == id) > 0;
        }
    }
}