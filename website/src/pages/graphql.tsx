import { graphql, PageProps } from 'gatsby'
import * as React from 'react'
import { PostsListPage } from '../components/blog/PostsListPage'
import { BlogType, BLOG_TYPE_TO_INFO } from '../components/blog/postTypes'

export const Page: React.FunctionComponent<PageProps<{ allMarkdownRemark: any }>> = props => (
    <PostsListPage
        blogInfo={BLOG_TYPE_TO_INFO[BlogType.GraphQLSummit]}
        posts={props.data.allMarkdownRemark.edges.filter((post: any) => post.node.frontmatter.published === true)}
        location={props.location}
    />
)

export default Page

export const pageQuery = graphql`
    query GraphQLPosts {
        allMarkdownRemark(
            filter: { fields: { blogType: { eq: "graphql" } } }
            sort: { fields: [frontmatter___publishDate], order: DESC }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        heroImage
                        author
                        tags
                        publishDate(formatString: "MMMM D, YYYY")
                        slug
                        published
                        description
                    }
                    html
                    excerpt(pruneLength: 300)
                    fields {
                        slug
                        permalink
                        blogType
                    }
                }
            }
        }
    }
`
