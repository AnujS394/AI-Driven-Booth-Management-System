// utility functions for generating and downloading files in the browser

export function downloadCSV(filename: string, rows: any[]) {
  if (!rows || !rows.length) {
    console.warn('downloadCSV called with empty data');
    return;
  }

  const header = Object.keys(rows[0]);
  const csvLines = [header.join(',')];

  rows.forEach((row) => {
    const line = header
      .map((field) => {
        const value = row[field] == null ? '' : row[field];
        // wrap in quotes if necessary and escape existing quotes
        const stringified = String(value).replace(/"/g, '""');
        return `"${stringified}"`;
      })
      .join(',');
    csvLines.push(line);
  });

  const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadJSON(filename: string, data: any) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadText(filename: string, text: string, mime = 'text/plain') {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
