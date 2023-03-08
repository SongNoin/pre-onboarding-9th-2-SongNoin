import {
  Text,
  Divider,
  Heading,
  SimpleGrid,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImageCard } from "../../components/commons/Cards/ImageCard";
import { DetailModal } from "../../components/commons/Modals/DetailModal";
import { ITreavelItem } from "../../types/ITravelItem";

export const ReservationPage = () => {
  const [reservationList, setReservationList] = useState<ITreavelItem[]>([]);
  const [detailModalData, setDetailModalData] = useState<ITreavelItem>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const cart = JSON.parse(String(localStorage.getItem("cart"))) || [];
    setReservationList(cart);
  }, []);

  function onClickShowDetailModal(travelItem: ITreavelItem) {
    setDetailModalData(travelItem);
    onOpen();
  }

  function onClickDeleteReservation(idx: number) {
    const cart = JSON.parse(String(localStorage.getItem("cart"))) || [];
    cart.splice(
      cart.findIndex((cartItem: ITreavelItem) => cartItem.idx === idx),
      1
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    setReservationList(cart);
    alert("장바구니에서 삭제했습니다!");
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <>
      <Container centerContent>
        <Heading size="lg" marginBottom={100}>
          장바구니
        </Heading>
      </Container>
      <Divider marginBottom={100} />
      {reservationList.length === 0 ? (
        <Container centerContent>
          <Text fontSize="3xl" as={"b"}>
            장바구니 안에 상품이 없습니다.
          </Text>
        </Container>
      ) : (
        <>
          <SimpleGrid
            columns={[null, 4]}
            spacingX={"10px"}
            spacingY={"50px"}
            justifyItems="center"
          >
            {reservationList.map((reservationItem) => {
              return (
                <ImageCard
                  key={reservationItem.idx}
                  idx={reservationItem.idx}
                  imageUrl={reservationItem.mainImage}
                  name={reservationItem.name}
                  space={reservationItem.spaceCategory}
                  price={reservationItem.price}
                  buttonText={"삭제"}
                  onClickCard={() => onClickShowDetailModal(reservationItem)}
                  onClickButton={() =>
                    onClickDeleteReservation(reservationItem.idx)
                  }
                />
              );
            })}
          </SimpleGrid>
          <Divider my={"50px"} />
          <Container centerContent>
            <Text fontSize="lg" as="b">
              총 결제액
            </Text>
            <Text mb={3}>
              {reservationList
                .reduce((sum, item) => {
                  return sum + item.price;
                }, 0)
                .toLocaleString("kr")}
              원
            </Text>
          </Container>
        </>
      )}

      <DetailModal
        isOpen={isOpen}
        onClose={onClose}
        travelItem={detailModalData}
      />
    </>
  );
};
