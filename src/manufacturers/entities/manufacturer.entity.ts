import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../../cars/entities/car.entity';

@Entity({ name: 'manufacturers' })
export class Manufacturer {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'BMW', description: 'Название' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: 'BMW', description: 'Адрес' })
  @Column()
  address: string;

  @ApiProperty({ example: 'Иванов В. В.', description: 'Директор' })
  @Column()
  director: string;

  @ApiProperty({ example: 'Иванов В. В.', description: 'Главный бухгалтер' })
  @Column()
  accountant: string;

  @ApiProperty({ description: 'Номер счета' })
  @Column()
  account: string;

  @ApiProperty({ description: 'БИК' })
  @Column()
  bic: string;

  @ApiProperty({ type: () => [Car], description: 'Список автомобилей' })
  @OneToMany(() => Car, (car: Car) => car.manufacturer, { onDelete: 'CASCADE' })
  cars: Car[];
}