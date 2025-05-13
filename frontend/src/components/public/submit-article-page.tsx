"use client"; // Enables Client Component behavior in Next.js 13+

import { useRouter } from "next/navigation"; // Next.js hook for client-side navigation
import React, { ChangeEvent, FormEvent, useState, useRef } from "react";
import Header from "../header";
import { Article, DefaultEmptyArticle } from "../article";


// Component: SubmitArticlePage
function SubmitArticlePage() {
  const router = useRouter();

  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);

  const bibtexParse = require('bibtex-parse-js');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setArticle({
      ...article,
      [name]:
        name === "published_year"
          ? value === ""
            ? undefined
            : parseInt(value, 10)
          : value,
    });
  };

  const [submitResult, setSubmitResult] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(article),
        }
      );

      if (response.ok) {
        setSubmitResult("Article submitted successfully.");
        setArticle(DefaultEmptyArticle);

        // Optionally redirect after delay
        setTimeout(() => router.push("/public-page"), 4000);
      } else {
        const errorData = await response.json();
        setSubmitResult(
          `Submission failed: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (err) {
      console.error("Error from SubmitArticle:", err);
      setSubmitResult("Network error: Could not submit article.");
    }
  };

  const handleUploadClick = () => {
  const file = fileInputRef.current?.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result as string;
    try {
      const parsed = bibtexParse.toJSON(content);
      if (parsed.length > 0) {
        const entry = parsed[0].entryTags;

        setArticle({
          title: entry.title || "",
          authors: entry.author || "",
          journal_name: entry.journal || "",
          published_year: entry.year ? parseInt(entry.year, 10) : undefined,
          volume: entry.volume || "",
          number: entry.number || "",
          pages: entry.pages || "",
          doi: entry.doi || "",
        });
      } else {
        console.error("No valid BibTeX entries found.");
      }
    } catch (err) {
      console.error("Failed to parse BibTeX:", err);
    }
  };
  reader.readAsText(file);
};

  // Handler: Navigate back to public page if user cancels
  const handleCancelClick = () => {
    router.push("/public-page");
  };

  return (
    <div className="container-fluid">
      <Header title="SPEED" role="Public User" />

      <div className="row">
        <div className="col-12 text-center my-2 display-6">
          Submit an Article to SPEED Database
        </div>

        {/* Import BibTeX */}
        <div className="row align-items-center mb-2">
          <div className="col-6 text-end text-primary fs-5">
            Import a BibTeX format file
          </div>
          <div className="col-3">
            <input type="file" className="form-control" accept=".bib" ref={fileInputRef} />
          </div>
          <div className="col-3">
            <button type="button" className="btn btn-primary w-100" onClick={handleUploadClick}>
              Upload
            </button>
          </div>
        </div>

        {/* Manual Input Fields */}
        <form onSubmit={onSubmit}>
          <div className="col-12 text-center my-2 fs-5 text-warning">
            or Please fill the article details below
          </div>

          <div className="col-12 mb-2">
            <label className="form-label fw-bold">Article title *</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={article.title}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-12 mb-2">
            <label className="form-label fw-bold">Authors *</label>
            <input
              type="text"
              name="authors"
              className="form-control"
              value={article.authors}
              onChange={onChange}
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-4">
              <label className="form-label fw-bold">Journal name *</label>
              <input
                type="text"
                name="journal_name"
                className="form-control"
                value={article.journal_name}
                onChange={onChange}
                required
              />
            </div>

            <div className="col-2">
              <label className="form-label fw-bold">Year *</label>
              <input
                type="number"
                name="published_year"
                className="form-control"
                value={article.published_year || ""}
                onChange={onChange}
                required
              />
            </div>

            <div className="col-2">
              <label className="form-label fw-bold">Volume</label>
              <input
                type="text"
                name="volume"
                className="form-control"
                value={article.volume}
                onChange={onChange}
              />
            </div>

            <div className="col-2">
              <label className="form-label fw-bold">Number</label>
              <input
                type="text"
                name="number"
                className="form-control"
                value={article.number}
                onChange={onChange}
              />
            </div>

            <div className="col-2">
              <label className="form-label fw-bold">Pages</label>
              <input
                type="text"
                name="pages"
                className="form-control"
                value={article.pages}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label fw-bold">DOI *</label>
            <input
              type="text"
              name="doi"
              className="form-control"
              value={article.doi}
              onChange={onChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-12 text-end my-3">
                {submitResult}
            </div>
          </div>

          {/* Cancel and Submit Buttons */}
          <div className="row mb-4">
            <div className="col-6 text-start">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
            <div className="col-6 text-end">
              <button type="submit" className="btn btn-success btn-sm">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitArticlePage;
