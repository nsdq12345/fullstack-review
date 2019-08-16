import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <tbody>
      <tr>
        <td>
          Picture
        </td>
        <td>
          Repo Name
        </td>
        <td>
          Username
        </td>
        <td>
          Fork Count
        </td>
        <td>
          Watcher Count
        </td>
        <td>
          URL
        </td>
      </tr>
    {props.repos.map((data) => {
      return (<tr>
        <td>
          <img src={data.pic} height="40" width="40"/>
        </td>
        <td>
          {data.repoName}
        </td>
        <td>
          {data.username}
        </td>
        <td>
          {data.forkCount}
        </td>
        <td>
          {data.watcherCount}
        </td>
        <td>
          {data.url}
        </td>
      </tr>);
    })}
      </tbody>
    </table>
  </div>
)

export default RepoList;