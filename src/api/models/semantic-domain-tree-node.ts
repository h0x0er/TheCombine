/* tslint:disable */
/* eslint-disable */
/**
 * BackendFramework
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { SemanticDomain } from "./semantic-domain";

/**
 *
 * @export
 * @interface SemanticDomainTreeNode
 */
export interface SemanticDomainTreeNode {
  /**
   *
   * @type {SemanticDomain}
   * @memberof SemanticDomainTreeNode
   */
  node: SemanticDomain;
  /**
   *
   * @type {SemanticDomain}
   * @memberof SemanticDomainTreeNode
   */
  parent: SemanticDomain;
  /**
   *
   * @type {SemanticDomain}
   * @memberof SemanticDomainTreeNode
   */
  previous: SemanticDomain;
  /**
   *
   * @type {SemanticDomain}
   * @memberof SemanticDomainTreeNode
   */
  next: SemanticDomain;
  /**
   *
   * @type {Array<SemanticDomain>}
   * @memberof SemanticDomainTreeNode
   */
  children: Array<SemanticDomain>;
}
