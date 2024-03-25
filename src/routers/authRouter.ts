import { Router, Response, Request } from 'express';
import { loginController } from '../controllers';
import { validate } from '../middlewares';
import { loginSchema } from '../schemas';
import { requestType } from '../types';

import { ResumeModel } from '../models';
import path from 'path';
import fs from 'fs';
const router = Router();

router.post('/login', validate(loginSchema, requestType.body), loginController);

router.get('/download/resume', async (req: Request, res: Response) => {
  try {
    const userAgent = req.headers['user-agent'];
    const os = userAgent?.split(/[()]/)[1];
    const browser = userAgent?.split(/[()]/)[4];

    const saveres = new ResumeModel({
      os,
      browser,
      ip: req.ip,
    });
    await saveres.save();

    const filePath = path.join(__dirname, '../utils/resume.pdf');
    const fileName = `NDACYAYISENGA Fabrice's Resume `;
    if (fs.existsSync(filePath)) {
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${fileName}"`,
      );
      res.setHeader('Content-Type', 'application/pdf');
      const fileStream = fs.createReadStream(filePath);
      console.log(fileStream);
      fileStream.pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    }
  } catch (e) {
    res.status(404).json({ message: 'file Not found' });
  }
});

export default router;
