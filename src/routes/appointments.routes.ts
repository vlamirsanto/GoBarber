import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parserdDate = startOfHour(parseISO(date));

  const findAppointmenInSameDate = appointments.find(appointment =>
    isEqual(parserdDate, appointment.date),
  );

  if (findAppointmenInSameDate)
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });

  const appointment = {
    id: uuid(),
    provider,
    date: parserdDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
