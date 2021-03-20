import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// DTO -> Data Transfer Object
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const finAppointment = await this.findOne({
      where: { date },
    });

    return finAppointment || null;
  }
}

export default AppointmentsRepository;
