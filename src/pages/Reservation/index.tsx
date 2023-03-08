import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ImageCard } from "../../components/commons/Cards/ImageCard";
import { DetailModal } from "../../components/commons/Modals/DetailModal";
import { ITreavelItem } from "../../types/ITravelItem";

export const ReservationPage = () => {
  const [reservationList, setTravelList] = useState<ITreavelItem[]>([]);
  const [detailModalData, setDetailModalData] = useState<ITreavelItem>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onClickShowDetailModal(travelItem: ITreavelItem) {
    setDetailModalData(travelItem);
    onOpen();
  }

  function onClickDeleteReservation() {
    console.log("delete");
  }

  return (
    <>
      <Flex justifyContent={"center"}>
        <Heading size="lg" marginBottom={100}>
          장바구니
        </Heading>
      </Flex>
      <Divider marginBottom={100} />
      <SimpleGrid
        minChildWidth="xs"
        columns={[2]}
        spacingX={"10px"}
        spacingY={"50px"}
        justifyItems="center"
      >
        {reservationList.map((reservationItem) => {
          return (
            <ImageCard
              idx={reservationItem.idx}
              imageUrl={reservationItem.mainImage}
              name={reservationItem.name}
              space={reservationItem.spaceCategory}
              price={reservationItem.price}
              buttonText={"삭제"}
              onClickCard={() => onClickShowDetailModal(reservationItem)}
              onClickButton={onClickDeleteReservation}
            />
          );
        })}
      </SimpleGrid>
      <DetailModal
        isOpen={isOpen}
        onClose={onClose}
        travelItem={detailModalData}
      />
    </>
  );
};
