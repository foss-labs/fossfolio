import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { OrganizationMemberService } from "../services/org-member.service";
import { AuthGuard } from "@nestjs/passport";
import { RbacGuard } from "../services/guards/rbac-member.guard";
import { Roles } from "../services/decorator/roles.decorator";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "@api/utils/db";
import type { UpdateMemberRole } from "../services/dto/update-role.dto";
import type { RemoveMember } from "../services/dto/member-remove.dto";

@Controller("org/member")
export class OrgMemberController {
  constructor(private readonly orgMemberService: OrganizationMemberService) {}

  @Get("/:orgID")
  @Roles(Role.ADMIN, Role.EDITOR, Role.VIEWER)
  @ApiTags("org-members")
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async getMembers(@Param("orgID") orgID: string) {
    return await this.orgMemberService.getMembers(orgID);
  }

  @Patch("/remove")
  @ApiTags("org-members")
  @ApiOperation({ summary: "Remove members from organization" })
  @ApiResponse({
    status: 200,
    description: "User will be removed successfully",
  })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async removeUser(@Body() data: RemoveMember) {
    return await this.orgMemberService.removeMember(
      data.organizationId,
      data.memberId
    );
  }

  @Patch("/role")
  @ApiTags("org-members")
  @ApiOperation({ summary: "Update member role in org" })
  @ApiResponse({ status: 200, description: "User role will be updated" })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard("jwt"), RbacGuard)
  async updateUserRole(@Body() data: UpdateMemberRole) {
    return await this.orgMemberService.updateRole(
      data.organizationId,
      data.memberId,
      data.role as Role
    );
  }
}