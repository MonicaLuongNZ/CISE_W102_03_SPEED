"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const roles_guard_1 = require("./roles/roles.guard");
const core_2 = require("@nestjs/core");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: true, credentials: true });
    const reflector = app.get(core_2.Reflector);
    app.useGlobalGuards(new roles_guard_1.RolesGuard(reflector));
    const port = process.env.PORT || 5000;
    await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap().catch((err) => {
    console.error('Failed to start the server:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map