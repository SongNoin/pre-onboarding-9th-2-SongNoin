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
  const [detailModalData, setDetailModalData] = useState<ITreavelItem>();
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
    setDetailModalData(travelItem);
    onOpen();
  }
  function onClickReserve() {
    console.log("reserve");
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
        minChildWidth="xs"
        columns={[2]}
        spacingX={"10px"}
        spacingY={"50px"}
        justifyItems="center"
      >
        {travelList.map((travelItem) => {
          return (
            <ImageCard
              idx={travelItem.idx}
              imageUrl={travelItem.mainImage}
              name={travelItem.name}
              space={travelItem.spaceCategory}
              price={travelItem.price}
              buttonText={"예약"}
              onClickCard={() => onClickShowDetailModal(travelItem)}
              onClickButton={onClickReserve}
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
