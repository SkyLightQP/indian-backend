import { app, logger } from './index';

const PORT = 10002;
app.listen(PORT, () => logger.info(`Backend server listening on ${PORT}`));
