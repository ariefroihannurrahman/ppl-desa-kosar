import Loading from './Loading';
import Error from './Error';

function ConditioningRender({
  actionType, status, children, onRefresh, loading, errMessage,
}) {
  if (status === 'LOADING') {
    return loading ?? <Loading />;
  } if (status === 'SUCCESS') {
    return children;
  }
  if (status === `${actionType}/pending`) {
    return loading ?? <Loading />;
  } if (status === `${actionType}/fulfilled`) {
    return children;
  }
  return <Error onRefresh={onRefresh} message={errMessage} />;
}

export default ConditioningRender;
