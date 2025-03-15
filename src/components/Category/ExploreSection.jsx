import routes from "@utils/routes";
import React from "react";
import CustomLink from "@widget/customLink";

const ExploreSection = ({ }) => {
    const category = {
        slug: "smartphones",
        name: "Gaming",
        detailTitle: "All our coverage of the latest video games, consoles and accessories.",
        subCategories: [
            { id: 1, name: "Test", slug: "test" },
            { id: 2, name: "Test2", slug: "test2" },
            { id: 3, name: "Test3", slug: "test3" },
            { id: 4, name: "Test4", slug: "test4" },
        ],
    };
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center space-x-2 gap-3">
                <h1 className="text-6xl font-bold dark:text-white">{category.name}</h1>
                <span className="text-lg text-gray-500 h-14  w-1 border bg-gray-400"></span>
                <span className="mb-2 text-lg">{category.detailTitle}</span>
            </div>
            <div className=" flex gap-6 items-center  align-middle content-center">

                <h2 className="text-2xl font-bold dark:text-white ">Explore {category.name}</h2>
                <div className="flex gap-6">
                    {category?.subCategories?.length > 0 &&
                        category?.subCategories?.map((subCat) => (
                            <CustomLink
                                key={subCat.id}
                                href={routes.subCategory(category.slug, subCat.slug)}
                                className="inline-block bg-white hover:bg-blue-700 text-black  rounded-lg border border-black-600 px-2 py-1 transition-colors mb-2"
                            >
                                {subCat.name}
                            </CustomLink>
                        ))}
                </div>
            </div>
        </div>

    );
};

export default ExploreSection;
