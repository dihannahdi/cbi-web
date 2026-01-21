export const IMAGE_QUERY = {
  image: {
    fields: ["url", "alternativeText", "width", "height"],
  },
};

export const WITH_HEADLINE_QUERY = {
  headline: {
    fields: "*",
    populate: {
      ...IMAGE_QUERY,
    },
  },
};

export const WITH_BANNER_CTA_QUERY = {
  bannerCTA: {
    fields: ["title", "ctaText", "description"],
    populate: {
      ...IMAGE_QUERY,
    },
  },
};

export const WITH_METADATA = {
  metadata: {
    populate: "*",
  },
};
