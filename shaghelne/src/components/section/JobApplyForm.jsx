import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/utils/api";

export default function JobApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
    portfolio: "",
    linkedIn: "",
    github: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Fetch job data
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobData();
    }
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      resume: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      // In a real application, you would upload the file to a server first
      // and then include the URL in the application data
      
      // For now, we'll simulate a successful application
      // In a real app, you would use api.post('/job-applications', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Reset form after submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
        portfolio: "",
        linkedIn: "",
        github: "",
      });
      
      // Redirect to success page or dashboard after a delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (err) {
      console.error("Error submitting application:", err);
      setSubmitError("Failed to submit your application. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8 mx-auto text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading job details...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8 mx-auto text-center">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8 mx-auto text-center">
              <div className="alert alert-info" role="alert">
                Job not found
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="our-contact-form py80 py50-md ovh position-relative">
      <div className="container">
        <div className="row wow fadeInUp">
          <div className="col-lg-8 mx-auto">
            <div className="mb60 mb30-md text-center">
              <h2>{submitSuccess ? "Application Submitted!" : `Apply for: ${job.title}`}</h2>
              <p className="text">
                {submitSuccess 
                  ? "Your application has been successfully submitted. You will be redirected to your dashboard shortly." 
                  : `Apply to work with ${job.company?.name || "Company"}`}
              </p>
            </div>
          </div>
        </div>
        
        {submitSuccess ? (
          <div className="row wow fadeInUp">
            <div className="col-lg-8 mx-auto">
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Thank you for your application!</h4>
                <p>We have received your application and will review it shortly.</p>
                <hr />
                <p className="mb-0">You will be redirected to your dashboard in a few seconds.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="row wow fadeInUp">
            <div className="col-lg-8 mx-auto">
              <div className="contact-form-style1">
                {submitError && (
                  <div className="alert alert-danger mb-4" role="alert">
                    {submitError}
                  </div>
                )}
                <form className="pt10" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb30">
                        <label className="form-label fw500 fz16 dark-color">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Full Name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb30">
                        <label className="form-label fw500 fz16 dark-color">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb30">
                        <label className="form-label fw500 fz16 dark-color">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Your Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb30">
                        <label className="form-label fw500 fz16 dark-color">Cover Letter</label>
                        <textarea
                          className="form-control"
                          rows="6"
                          placeholder="Tell us about yourself and why you're a good fit for this position"
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb30">
                        <label className="form-label fw500 fz16 dark-color">Resume/CV</label>
                        <input
                          type="file"
                          className="form-control"
                          name="resume"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          required
                        />
                        <div className="form-text">Upload your CV/Resume (PDF, DOC, DOCX)</div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb30">
                        <label className="form-label fw500 fz16 dark-color">Portfolio URL (Optional)</label>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://yourportfolio.com"
                          name="portfolio"
                          value={formData.portfolio}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb30">
                        <label className="form-label fw500 fz16 dark-color">LinkedIn URL (Optional)</label>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="LinkedIn Profile"
                          name="linkedIn"
                          value={formData.linkedIn}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb30">
                        <label className="form-label fw500 fz16 dark-color">GitHub URL (Optional)</label>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="GitHub Profile"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="d-grid">
                        <button 
                          type="submit" 
                          className="ud-btn btn-thm"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Submitting...
                            </>
                          ) : "Submit Application"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 