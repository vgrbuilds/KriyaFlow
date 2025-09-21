import EntitiesPage from './EntitiesPage';
import EventForm from '../components/events/EventForm';
import EventList from '../components/events/EventList';

export default function EventsPage() {
  return (
    <EntitiesPage
      title="Events"
      path="/api/events"
      Form={EventForm}
      List={(props) => <EventList events={props.items} onUpdate={props.onUpdate} onDelete={props.onDelete} />}
    />
  );
}