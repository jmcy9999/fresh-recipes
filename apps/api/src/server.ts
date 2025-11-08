import Fastify from 'fastify';

const app = Fastify({ logger: false });

app.get('/health', async () => {
  return { status: 'ok' };
});

if (require.main === module) {
  app.listen({ port: 3000, host: '0.0.0.0' })
    .then(() => app.log.info('API listening on http://localhost:3000'))
    .catch((err) => {
      app.log.error(err);
      process.exit(1);
    });
}

export default app;
