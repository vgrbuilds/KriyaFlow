import EntitiesPage from './EntitiesPage';
import BucketForm from '../components/bucketlist/BucketForm';
import BucketList from '../components/bucketlist/BucketList';

export default function BucketlistPage() {
  return (
    <EntitiesPage
      title="Bucketlist"
      path="/api/bucketlist-items"
      Form={BucketForm}
      List={(props) => <BucketList items={props.items} onUpdate={props.onUpdate} onDelete={props.onDelete} />}
    />
  );
}