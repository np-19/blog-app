import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import LoadingBar from '../LoadingBar';
import Container from '../Container/Container';

const Protected = ({children, authentication = true}) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if(!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication])

  return (
    loader ? (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <Container>
          <LoadingBar message="Checking authentication..." />
        </Container>
      </div>
    ) : <>{children}</>
  )
}

export default Protected
