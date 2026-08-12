import React from "react";
import { Briefcase, MapPin } from "lucide-react";
import { latestJobs } from "../data/communityPosts";
import "./JobsCard.css";

export default function JobsCard() {
  return (
    <div className="bn-widget-card">
      <h3 className="bn-widget-card__title">Latest Jobs</h3>
      <div className="bn-jobs-list">
        {latestJobs.map((job) => (
          <button type="button" className="bn-job-item" key={job.id}>
            <div className="bn-job-item__icon">
              <Briefcase size={15} strokeWidth={1.8} />
            </div>
            <div className="bn-job-item__body">
              <span className="bn-job-item__role">{job.role}</span>
              <span className="bn-job-item__company">{job.company}</span>
              <span className="bn-job-item__location">
                <MapPin size={11} strokeWidth={1.8} />
                {job.location}
              </span>
            </div>
            <span className="bn-job-item__type">{job.type}</span>
          </button>
        ))}
      </div>
      <a className="bn-widget-card__link" href="#" onClick={(e) => e.preventDefault()}>
        View all jobs
      </a>
    </div>
  );
}
