"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrate1748275170220 = void 0;
const typeorm_1 = require("typeorm");
class Migrate1748275170220 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    unsigned: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '63',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '127',
                    isUnique: true,
                },
                {
                    name: 'birthAt',
                    type: 'date',
                    isNullable: true,
                },
                {
                    name: 'role',
                    type: 'int',
                    length: '1',
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP()',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.Migrate1748275170220 = Migrate1748275170220;
//# sourceMappingURL=1748275170220-Migrate.js.map