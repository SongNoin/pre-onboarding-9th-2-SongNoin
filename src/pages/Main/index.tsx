import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageCard } from "../../components/commons/Cards/ImageCard";
import { DetailModal } from "../../components/commons/Modals/DetailModal";
import { ITreavelItem } from "../../types/ITravelItem";

export const MainPage = () => {
  const [travelList, setTravelList] = useState<ITreavelItem[]>([]);
  const [selectedTravelItem, setSelectedTraverItem] = useState<ITreavelItem>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getTravelList();
  }, []);

  async function getTravelList() {
    const res = await axios.get(
      "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f1be87a4-38e1-4c1e-a527-bd4775812374/mock_data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230308T031358Z&X-Amz-Expires=86400&X-Amz-Signature=7427fb19258be7986db614b1e8b55f9e3379af104bfff7145880a71d8f68ad9e&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22mock_data.json%22&x-id=GetObject"
    );
    setTravelList(res.data);
  }

  function onClickShowDetailModal(travelItem: ITreavelItem) {
    setSelectedTraverItem(travelItem);
    onOpen();
  }
  function onClickReserve(travelItem: ITreavelItem) {
    const cart = JSON.parse(String(localStorage.getItem("cart"))) || [];
    if (cart.find((el: ITreavelItem) => el.idx === travelItem.idx)) {
      alert("이미 장바구니에 있는 상품입니다");
      return;
    }
    const newItem = { ...travelItem };

    cart.push(newItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 담았습니다!");
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <>
      <Flex justifyContent={"center"}>
        <Heading size="lg" marginBottom={100}>
          여행 상품 모아보기
        </Heading>
      </Flex>
      <Divider marginBottom={100} />
      <SimpleGrid
        columns={[null, 4]}
        spacingX={"10px"}
        spacingY={"50px"}
        justifyItems="center"
      >
        {travelList.map((travelItem) => {
          return (
            <ImageCard
              key={travelItem.idx}
              idx={travelItem.idx}
              imageUrl={travelItem.mainImage}
              name={travelItem.name}
              space={travelItem.spaceCategory}
              price={travelItem.price}
              buttonText={"예약"}
              onClickCard={() => onClickShowDetailModal(travelItem)}
              onClickButton={() => onClickReserve(travelItem)}
            />
          );
        })}
      </SimpleGrid>
      <DetailModal
        isOpen={isOpen}
        onClose={onClose}
        travelItem={selectedTravelItem}
      />
    </>
  );
};
