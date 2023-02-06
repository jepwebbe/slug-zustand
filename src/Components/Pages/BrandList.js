import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";
import styled from "styled-components";
import appService from "../Appservices/AppService.js";
import { useSlug } from "../Hooks/useSlug.js";
import { useSlugUrl } from "../Hooks/useSlugUrl.js";
export default function BrandList() {
  const [activ, setActiv] = useState();
  const { setBrands, brands } = useSlug();
  const { setSlugUrl } = useSlugUrl();
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await appService.Get("brands");
        for (const parent of result.data.items) {
          parent.slug = slugify(parent.title, {
            strict: true,
            lower: true,
            locale: "da",
          });
        }
        setBrands(result.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, );
  return (
    <StyledApp>
      <ul>
        {brands.map((item, idx) => {
          return (
            <li
              onClick={() => setActiv(item.title)}
              className={activ === item.title ? "active" : ""}
              key={idx}
            >
              <Link
                onClick={() => setSlugUrl(item.request.url)}
                to={`${item.slug}`}
              >
                {item.title}
              </Link>
              {activ === item.title ? (
                <ul>
                  {brands.map((item, idx) => {
                    return <li key={idx}>{item.title}</li>;
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  .active {
    color: red;
  }
`;
