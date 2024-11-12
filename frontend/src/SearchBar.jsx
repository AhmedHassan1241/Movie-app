import React, { useState } from 'react';

export const MovieSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <form
        className="d-flex text-start me-lg-0 ms-3 me-4 mb-md-0 mb-3"
        role="search"
        action={`/movie/search/`}
        method="GET"
      >
        <input
          className="form-control input-placeholder-white py-lg-0 py-3"
          style={{ background: "transparent", borderColor: "#fff" }}
          type="search"
          name="title" // اسم الباراميتر اللي هيتبعت للسيرفر
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // تحديث الـ state مع كل تغيير
        />
        <button
          className="btn btn-primary"
          style={{ marginLeft: "-10px", borderRadius: "0 3px 3px 0", borderColor: "#fff", color: "#fff" }}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};
