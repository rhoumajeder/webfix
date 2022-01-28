import React from "react";

import './Ads.css';
import NewCarousel from "../NewCarousel/NewCarousel";
import { Container, Card } from "@material-ui/core";

function AdvServiceSec() {
  return (
    <div>
      <Container>
        <Card className="px-2 py-5 shadow mb-5">
          <NewCarousel />
        </Card>
      </Container>

    </div>
  );
}

export default AdvServiceSec;
