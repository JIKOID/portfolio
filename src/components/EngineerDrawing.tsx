function EngineerDrawing() {
  return (
    <svg
      className="engineer-drawing"
      viewBox="0 0 500 460"
      role="img"
      aria-label="노트북 앞에서 미소 짓는 남성의 손그림"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse className="drawing-wash" cx="260" cy="249" rx="175" ry="166" stroke="none" />

      {/* Small pencil marks make the portrait feel like a page from a sketchbook. */}
      <g className="drawing-accent" strokeWidth="1.7">
        <path d="m387 104 5-13m7 22 12-6m-16 21 13 1M82 246l-9-6m13-5-2-10" />
        <path d="M400 225v16m-8-8h16M119 125v11m-5-5h10" />
        <circle cx="366" cy="173" r="4" />
        <circle cx="104" cy="303" r="3" />
      </g>
      <g strokeWidth="1.5" opacity="0.6">
        <path d="M105 96c20-25 47-24 64-7m-3-11 4 12-13-1" />
        <path d="M116 407c84 5 190 6 279-1M145 413c68 4 144 4 206 0" />
      </g>
      <text x="73" y="81" className="drawing-note" stroke="none" fill="currentColor" transform="rotate(-9 73 81)">hello!</text>

      {/* Sweater and arms. */}
      <path className="drawing-paper" d="M211 235c-29 8-56 18-66 43-10 27-16 61-18 96 35 20 86 25 125 23 52 3 95-5 119-24-4-39-13-74-27-98-13-21-37-30-62-40Z" />
      <path d="M211 237c8 32 58 39 74 0M202 241c4 21 21 37 45 38 23 1 41-13 46-35" />
      <path d="M166 279c5 28 4 52-2 77m165-76c-4 20-1 42 7 62M142 344l19 13m176-14 19-6M180 287l8 17m124-18-7 18" />
      <path d="M131 374c14-9 28-12 44-10m151 7c12-6 25-6 38-1" />

      {/* Neck, ears, and face. */}
      <path className="drawing-paper" d="m220 209-3 32c13 16 37 20 57 2l-3-35" />
      <path d="M221 222c15 10 33 10 49 1" opacity="0.45" />
      <path className="drawing-paper" d="M193 151c-19-11-22 21-5 29l10 2m101-31c18-11 21 20 5 29l-9 3" />
      <path d="m187 158 6 11m111-10-6 11" strokeWidth="1.6" />
      <path className="drawing-paper" d="M194 125c-4 17-2 48 2 65 5 24 27 43 50 44 24 0 45-20 50-44 4-20 7-49-1-68-19-32-77-33-101 3Z" />

      {/* Soft waves sweep away from a loose center part, leaving the forehead visible. */}
      <path className="drawing-hair" d="M193 159c-6-11-9-23-7-33-9-12-7-27 2-35 1-17 18-28 34-26 12-9 26-5 32 3 12-10 28-7 36 2 16 0 25 14 23 27 10 12 6 29-3 39l-10 24-4-28c-7-1-15-4-22-10-11-9-17-20-20-33-2 17-13 30-27 37-9 4-18 5-25 4l-5 29-2-19Z" />
      <g className="drawing-hair-detail" strokeWidth="1.4">
        <path d="M246 77c-13-10-29-2-35 7-7 9-9 17-18 20M245 86c-4 14-18 25-35 28-5 1-10 0-13-2m47-15c-6 16-19 25-33 25M263 77c12-5 25 3 28 13 3 9 7 15 13 17m-42-20c3 15 14 28 29 31m-22-20c6 16 15 25 26 27" />
      </g>
      <path d="M203 70c6-7 17-10 26-9m47 2c8 0 17 4 21 10" strokeWidth="1.4" />
      <path d="M199 137c9-5 19-6 28-2m35 0c9-3 17-2 24 2" strokeWidth="2" />

      {/* Smiling eyes and a small smile. */}
      <g strokeWidth="2">
        <path d="M207 154c3-4 8-4 11 0m45 0c3-4 8-4 11 0m-31 5-4 19 7 2M232 194c8 8 20 8 28-1" />
      </g>
      <path d="m207 180 6 2m62-2-6 2M238 207l12 1" strokeWidth="1.5" opacity="0.45" />

      {/* Laptop in the foreground. */}
      <path className="drawing-laptop" d="M157 310c-1-5 2-8 7-8h158c5 0 8 3 7 8l-17 83H177Z" />
      <path d="m164 310 17 76m141-77-16 76" strokeWidth="1" opacity="0.35" />
      <path className="drawing-paper" d="M161 393h169l19 7c2 2 1 5-4 6H153c-5-1-7-4-3-6Z" />
      <path d="M220 394h51l-5 5h-40Z" strokeWidth="1.3" />
      <g className="drawing-accent" strokeWidth="2">
        <path d="m233 340-8 8 8 8m25-16 8 8-8 8m-10-20-6 24" />
      </g>
      <path d="M90 407h320" strokeWidth="1.8" />

      {/* A coffee cup beside the laptop. */}
      <path className="drawing-paper" d="m365 363 4 34c6 5 18 5 24 0l3-34" />
      <ellipse className="drawing-paper" cx="380.5" cy="363" rx="15.5" ry="4" />
      <path d="M396 369c17-3 15 18-2 17m-20-39c-7-8 7-10 0-19m12 20c-7-8 7-11 1-17" strokeWidth="1.7" />
    </svg>
  )
}

export default EngineerDrawing
