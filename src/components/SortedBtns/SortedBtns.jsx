import { useDispatch } from 'react-redux';
import { sortByAdded, sortByName } from 'redux/contacts/contactSlice';
import { SortBtn, BtnWrapper } from './SortedBtns.styled';
import { useContacts } from 'hooks/useContact';
import { ImSortAlphaAsc, ImSortAlphaDesc } from 'react-icons/im';
import { LiaSortDownSolid, LiaSortUpSolid } from 'react-icons/lia';

const SortedBtns = () => {
  const dispatch = useDispatch();
  const { sortedAlphabetic } = useContacts();
  const { recentlyAdded } = useContacts();
  return (
    <BtnWrapper>
      <SortBtn onClick={() => dispatch(sortByName())}>
        Sort by name
        {sortedAlphabetic ? (
          <ImSortAlphaDesc size="20" />
        ) : (
          <ImSortAlphaAsc size="20" />
        )}
      </SortBtn>
      <SortBtn onClick={() => dispatch(sortByAdded())}>
        Recently added{' '}
        {recentlyAdded ? (
          <LiaSortUpSolid size="20" />
        ) : (
          <LiaSortDownSolid size="20" />
        )}
      </SortBtn>
    </BtnWrapper>
  );
};

export default SortedBtns;
