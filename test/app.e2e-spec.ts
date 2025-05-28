import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { authRegisterDTO } from '../src/testing/auth-register-dto.mock';
import { Role } from '../src/enums/role.enum';
import dataSource from '../typeorm/data-source'

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
	let accessToken: string;
	let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

	afterEach(() => {
		app.close();
	})

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Registrar novo usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterDTO)
		expect(response.statusCode).toEqual(201)
		expect(typeof response.body.accessToken).toEqual('string')
  });

  it('Teste de login com novo usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
				email: authRegisterDTO.email,
				password: authRegisterDTO.password
			})
		expect(response.statusCode).toEqual(201)
		expect(typeof response.body.accessToken).toEqual('string')

		accessToken = response.body.accessToken;
  });

  it('Obter os dados do usuário logado', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
			.set('Authorization', `bearer ${accessToken}`)
      .send();

		expect(response.statusCode).toEqual(201);
		expect(typeof response.body.id).toEqual('number');
		expect(response.body.role).toEqual(Role.User);
  });

	it('Registrar novo usuário como Administrador', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({...authRegisterDTO, role: Role.Admin, email: 'fabio@mail.com'})
		expect(response.statusCode).toEqual(201)
		expect(typeof response.body.accessToken).toEqual('string')

		accessToken = response.body.accessToken;
  });

	it('Validar se a função do novo usuario ainda é User', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
			.set('Authorization', `bearer ${accessToken}`)
      .send()
		expect(response.statusCode).toEqual(201)
		expect(typeof response.body.id).toEqual('number')
		expect(response.body.role).toEqual(Role.User)

		userId = response.body.id
  });

	it('Tentar ver os usuarios logado como User', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
			.set('Authorization', `bearer ${accessToken}`)
      .send()
		expect(response.statusCode).toEqual(403)
		expect(response.body.error).toEqual('Forbidden')
  });

	it('Alterando manualmente o usuário para a função administrador', async () => {
		const ds = await dataSource.initialize();

		const queryRunner = ds.createQueryRunner();

		await queryRunner.query(`
			UPDATE users SET role = ${Role.Admin} WHERE id = ${userId};
		`);

		const rows = await queryRunner.query(`
			SELECT * FROM users WHERE id = ${userId};
		`);

		dataSource.destroy();

		expect(rows.length).toEqual(1);
		expect(rows[0].role).toEqual(Role.Admin);
	});

	it('Tentar ver os usuarios logado como Admin ', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
			.set('Authorization', `bearer ${accessToken}`)
      .send()
		expect(response.statusCode).toEqual(200)
		expect(response.body.length).toEqual(2)
  });
});
