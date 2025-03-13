import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    const data = req.body;
    
    if (!Array.isArray(data)) {
      return res.status(400).json({
        message: 'Data must be an array.'
      });
    }

    const headers = Object.keys(data[0]);
    const headerRow = headers.map(header => `"${ header }"`).join(',');

    const dataRows = data.map(row =>
      headers.map(header => `"${ row[header] }"`).join(',')
    );

    const csv = [headerRow, ...dataRows].join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="Reporte.csv"');
    
    res.status(200).send(csv);
  } else {
    res.status(500).json({
      message: 'Error writing CSV file.'
    });
  }

};
