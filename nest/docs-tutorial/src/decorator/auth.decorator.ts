// import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
// import { AuthGuard } from "src/guard/auth.guard";
// import { RolesGuard } from "src/guard/roles.guard";

// export function Auth(...roles: Role[]) {
//     return applyDecorators(
//         SetMetadata('roles', roles),
//         UseGuards(AuthGuard, RolesGuard),
//         // ApiBearerAuth() , //THESE 2 ARE SWAGGER DECORATORS?
//         // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
//     );
// }
