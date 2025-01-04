import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from './roles/role.enum';
import { UsersService } from 'src/users/users.service';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { JsonValue } from '@prisma/client/runtime/library';
type UserOrEmployee =
  | {
      id: number;
      name: string;
      surname: string;
      email: string;
      phone: string;
      birthday: Date;
      password: string;
      passwordSetAt: Date;
      passwordExpiresAt: Date | null;
      passwordsHistory: JsonValue | null;
      isDeleted: boolean;
      role: string;
      lockUntil: Date | null;
      loginAttempts: number;
    }
  | {
      id: number;
      name: string;
      surname: string;
      email: string;
      phone: string;
      birthday: Date;
      password: string;
      passwordSetAt: Date;
      passwordExpiresAt: Date;
      passwordsHistory: JsonValue;
      role: string;
      lockUntil: Date | null;
      loginAttempts: number;
    };

@Injectable()
export class AuthService {
  private codes = new Map<string, { code: string; expires: number }>();
  constructor(
    private jwtSvc: JwtService,
    private readonly usersService: UsersService,
    private prismaService: PrismaService,
  ) {}
  //its okey
  async sendEmail(correo, subject, html) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cayrouniformes38@gmail.com',
        pass: 'qewd ahzb vplo arua',
      },
    });

    var mailOptions = {
      from: 'cayrouniformes38@gmail.com',
      to: correo,
      subject: subject,
      html: html,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al enviar el correo de recuperación,',
      );
    }
  }
  //its okey
  async verifyCode(userEmail: string, code: string) {
    const record = this.codes.get(userEmail);
    let userFound: UserOrEmployee | null =
      await this.prismaService.user.findUnique({
        where: {
          email: userEmail,
          active: true,
        },
      });

    if (!userFound) {
      userFound = await this.prismaService.employee.findUnique({
        where: { email: userEmail },
      });
      if (!userFound) {
        throw new NotFoundException('Usuario no registrado.');
      }
    }

    if (!record || record.expires < Date.now()) {
      throw new ConflictException('El codigo ha expirado o es invalido.');
    }

    if (record.code !== code) {
      throw new ConflictException('Codigo invalido.');
    }

    this.codes.delete(userEmail);
    let expiresIn: any;
    switch (userFound.role) {
      case Role.ADMIN:
        expiresIn = '8h';
        break;
      case Role.USER:
        expiresIn = '1d';
        break;
      case Role.EMPLOYEE:
        expiresIn = '4h';
        break;
      default:
        expiresIn = '1h';
    }
    const {
      password,
      passwordExpiresAt,
      passwordSetAt,
      passwordsHistory,
      ...rest
    } = userFound;
    const payload = { sub: userFound.id, role: userFound.role };
    const token = this.jwtSvc.sign(payload, { expiresIn });
    await this.prismaService.userActivity.create({
      data: {
        email: userFound.email,
        action: 'Inicio de sesión.',
        date: new Date(),
      },
    });
    return { user: { ...rest, role: userFound.role }, token };
  }
  //its okey
  async sendCode(email: string) {
    try {
      const configInfo = await this.prismaService.configuration.findMany();
      const timeToken = configInfo[0].timeTokenEmail;
      const dataConfig = configInfo[0].emailVerificationInfo[0];
      const expirationTime = Date.now() + timeToken * 60000;
      const verificationCode = crypto.randomInt(100000, 999999).toString();
      this.codes.set(email, {
        code: verificationCode,
        expires: expirationTime,
      });
      const currentYear = new Date().getFullYear();
      const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verificación de Cuenta Cayro</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <tr>
                    <td align="center" >
                        <img src="https://res.cloudinary.com/dhhv8l6ti/image/upload/v1728748461/logo.png" alt="Cayro Uniformes" style="display: block; width: 150px; max-width: 100%; height: auto;">
                    </td>
                </tr>
                <tr>
                    <td style="padding: 0px 30px;">
                        <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px; text-align: center;">${dataConfig.title} </h1>
                        <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                            ${dataConfig.greeting} 
                        </p>
                        <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                            ${dataConfig.maininstruction} 
                        </p>
                        <div style="background-color: #f0f0f0; border-radius: 4px; padding: 20px; text-align: center; margin-bottom: 20px;">
                            <span style="font-size: 32px; font-weight: bold; color: #0099FF; letter-spacing: 5px;">${verificationCode}</span>
                        </div>
                        <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                            ${dataConfig.secondaryinstruction} 
                        </p>
                        <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                            ${dataConfig.expirationtime} 
                        </p>
                        <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                            ${dataConfig.finalMessage} 
                        </p>
                        <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                            ${dataConfig.signature} 
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #27272A; padding: 20px 30px;">
                        <p style="color: #ffffff; font-size: 14px; line-height: 1.5; margin: 0; text-align: center;">
                            © ${currentYear} Cayro Uniformes. Todos los derechos reservados.
                        </p>
                        <p style="color: #ffffff; font-size: 14px; line-height: 1.5; margin: 10px 0 0; text-align: center;">
                            <a href="#" style="color: #ffffff; text-decoration: none;">Política de Privacidad</a> | 
                            <a href="#" style="color: #ffffff; text-decoration: none;">Términos de Servicio</a>
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
      `;
      await this.sendEmail(email, 'Codigo de verificación', html);
      return { message: 'Codigo de verificación enviado.' };
    } catch (error) {
      console.log(error);
    }
  }
  async login(loginDto: LoginDto) {
    // Buscar al usuario en la colección de usuarios
    let userFound: UserOrEmployee = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
    });
    const configInfo = await this.prismaService.configuration.findMany();

    if (!userFound) {
      userFound = await this.prismaService.employee.findUnique({
        where: { email: loginDto.email },
      });
      if (!userFound) {
        throw new NotFoundException('Usuario no registrado.');
      }
    }

    // Verificar si la cuenta está bloqueada temporalmente
    if (userFound.lockUntil && userFound.lockUntil > new Date()) {
      const now = new Date();
      const timeDifference = userFound.lockUntil.getTime() - now.getTime();

      // Calcular los minutos y segundos restantes
      const minutesRemaining = Math.floor(timeDifference / (1000 * 60));
      const secondsRemaining = Math.floor(
        (timeDifference % (1000 * 60)) / 1000,
      );

      // Construir el mensaje dinámico
      let formattedMessage = '';
      if (minutesRemaining > 0) {
        formattedMessage = `${minutesRemaining} minutos y ${secondsRemaining} segundos`;
      } else {
        formattedMessage = `${secondsRemaining} segundos`;
      }
      throw new ForbiddenException(
        'Cuenta bloqueada temporalmente. Inténtalo de nuevo en ' +
          formattedMessage,
      );
    }

    // Verificar si la contraseña es válida
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      userFound.password,
    );

    if (!isPasswordValid) {
      if (userFound.role === Role.USER) {
        await this.prismaService.user.update({
          where: {
            email: loginDto.email,
          },
          data: {
            loginAttempts: (userFound.loginAttempts || 0) + 1,
          },
        });
      }
      if (userFound.role === Role.ADMIN || userFound.role === Role.EMPLOYEE) {
        await this.prismaService.employee.update({
          where: {
            email: loginDto.email,
          },
          data: {
            loginAttempts: (userFound.loginAttempts || 0) + 1,
          },
        });
      }

      // Bloquear la cuenta por 0 minutos después de 5 intentos fallidos y reiniciar los intentos
      if (userFound.loginAttempts === configInfo[0].attemptsLogin) {
        await this.prismaService.userActivity.create({
          data: {
            email: loginDto.email,
            action: 'Cuenta bloqueada por 5 minutos.',
            date: new Date(),
          },
        });
        if (userFound.role === Role.USER) {
          await this.prismaService.user.update({
            where: {
              email: userFound.email,
            },
            data: {
              lockUntil: new Date(Date.now() + 5 * 60 * 1000),
              loginAttempts: 0,
            },
          });
        }
        if (userFound.role === Role.ADMIN || userFound.role === Role.EMPLOYEE) {
          await this.prismaService.employee.update({
            where: {
              email: userFound.email,
            },
            data: {
              lockUntil: new Date(Date.now() + 5 * 60 * 1000),
              loginAttempts: 0,
            },
          });
        }
      }

      throw new HttpException(
        'La contraseña es incorrecta.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Resetear los intentos de inicio de sesión después de un inicio exitoso
    if (userFound.role === Role.USER) {
      await this.prismaService.user.update({
        where: {
          email: loginDto.email,
        },
        data: {
          loginAttempts: 0,
        },
      });
    }
    if (userFound.role === Role.ADMIN || userFound.role === Role.EMPLOYEE) {
      await this.prismaService.employee.update({
        where: {
          email: loginDto.email,
        },
        data: {
          loginAttempts: 0,
        },
      });
    }

    // Enviar código de verificación si es un usuario regular activo
    if (userFound.role === Role.USER) {
      const user = await this.prismaService.user.findUnique({
        where: { email: userFound.email },
      });
      if (user.active === true) {
        await this.sendCode(loginDto.email);
      }
    }
    if (userFound.role === Role.ADMIN || userFound.role === Role.EMPLOYEE) {
      await this.sendCode(loginDto.email);
    }
    // Eliminar la contraseña antes de devolver la información del usuario o empleado
    const {
      password,
      passwordsHistory,
      passwordExpiresAt,
      passwordSetAt,
      ...rest
    } = userFound;
    return { ...rest };
  }

  async verifyToken(@Request() request) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: request.sub },
      });
      const admin =
        !user &&
        (await this.prismaService.employee.findUnique({
          where: { id: request.sub },
        }));
      // const employee = !user && !admin && await this.profesorModel.findById(request.sub);

      if (user || admin) {
        // if (user) {
        const entity = user || admin;
        // const entity = user;
        const {
          password,
          passwordsHistory,
          passwordExpiresAt,
          passwordSetAt,
          ...rest
        } = entity;
        return { ...rest };
      }
      throw new NotFoundException('El usuario no se encuentra registrado');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
