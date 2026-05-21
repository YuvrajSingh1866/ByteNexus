import React, { useState } from 'react';

export default function UploadSubject() {
  const [year, setYear] = useState('first');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [resourceType, setResourceType] = useState('notes');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const form = new FormData();
      form.append('year', year);
      form.append('name', name);
      form.append('slug', slug);
      form.append('description', description);
      form.append('resourceType', resourceType);
      form.append('title', title);
      if (file) form.append('file', file);

      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/subjects/upload`, {
        method: 'POST',
        body: form,
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setMessage(data.message || 'Uploaded successfully');
      setName(''); setSlug(''); setDescription(''); setTitle(''); setFile(null);
    } catch (err) {
      console.error(err);
      setMessage(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-subject-card">
      <h2>Upload Subject Resource</h2>
      <form onSubmit={submit}>
        <label>Year
          <select value={year} onChange={e=>setYear(e.target.value)}>
            <option value="first">First Year</option>
            <option value="second">Second Year</option>
          </select>
        </label>

        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>

        <label>Slug (unique)
          <input value={slug} onChange={e=>setSlug(e.target.value)} required />
        </label>

        <label>Description
          <textarea value={description} onChange={e=>setDescription(e.target.value)} />
        </label>

        <label>Resource Type
          <select value={resourceType} onChange={e=>setResourceType(e.target.value)}>
            <option value="notes">Notes</option>
            <option value="pyqs">PYQs</option>
            <option value="cho">CHO</option>
            <option value="assignments">Assignments</option>
            <option value="importantQuestions">Important Questions</option>
            <option value="videoResources">Video</option>
          </select>
        </label>

        <label>Title
          <input value={title} onChange={e=>setTitle(e.target.value)} />
        </label>

        <label>File (optional)
          <input type="file" onChange={e=>setFile(e.target.files[0])} />
        </label>

        <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
